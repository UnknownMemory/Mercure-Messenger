<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Form\RoomType;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use App\Repository\MessageRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


#[Route('/api/chat')]
class ChatController extends AbstractController
{

    public function __construct(ChatRepository $chatRepository, Security $security, UserRepository $userRepository)
    {
        $this->chatRepository = $chatRepository;
        $this->security = $security;
        $this->userRepository = $userRepository;
    }

    #[Route('/mes-chats', name: 'my_room')]
    public function index(SerializerInterface $serializerInterface): JsonResponse
    {
        $chatList = $this->chatRepository->findAllByUserChats($this->getUser());

        $jsonChatList  = $serializerInterface->serialize($chatList, 'json', ['groups' => 'getChat']);

        return new JsonResponse($jsonChatList, Response::HTTP_OK, [], true);
    }

    /* Voir toutes les rooms que je peux joins */
    #[Route('/all_room', name: 'all_room', methods: 'GET')]
    public function allRoom(SerializerInterface $serializerInterface): JsonResponse
    {
        $chatList = $this->chatRepository->findEmptyRooms();

        $jsonChatList  = $serializerInterface->serialize($chatList, 'json');

        return new JsonResponse($jsonChatList, Response::HTTP_OK, [], true);
    }


    /* Créer une room */
    #[Route('/creation/{idParticipant}', name: 'create_room', methods: ["GET", "POST"])]
    public function creationRooms($idParticipant, SerializerInterface $serializer): Response
    {

        /* Si un tchat existe déja avec 2 users peut importe leurs role (createur / participant) on envoie l'id du tchat qui existe déja */
        $chatExist = $this->chatRepository->findChatWidthUser($this->getUser(), $idParticipant);
        if ($chatExist) {

            $jsonChatExist = $serializer->serialize(['error' => $chatExist], 'json', ['groups' => 'getExistTchat']);
            return new JsonResponse($jsonChatExist, Response::HTTP_NOT_FOUND, [], true);
        }


        /* Sinon tu peux créer une nouvelle tchat room */
        $room = new Chat();
        $room->setCreateur($this->getUser());
        $room->setParticipant($this->userRepository->find($idParticipant));
        $room->setLien("https://github.com/endroid/qr-code-bundle");
        $room->setNom("Room de " . $this->getUser()->getUsername() . " et " . $this->userRepository->find($idParticipant)->getUsername());
        $this->chatRepository->save($room, true);

        $jsonRoom = $serializer->serialize($room->getId(), 'json');
        return new JsonResponse($jsonRoom, Response::HTTP_OK, [], true);
    }


    /* Afficher une room */
    #[Route('/{id}/info', name: 'room_info', methods: ['GET'])]
    public function chatInfo(Chat $chat, SerializerInterface $serializer, Request $request): JsonResponse
    {
        if ($this->getUser() === $chat->getCreateur() || $this->getUser() === $chat->getParticipant()) {
            $jsonMessage = $serializer->serialize($chat, 'json',  ['groups' => 'getChat']);
            return new JsonResponse($jsonMessage, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse('Vous n\'avez pas accès à cette chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        }
    }

    #[Route('/{id}', name: 'one_room', methods: ['GET'])]
    public function oneRoom(Chat $chat, MessageRepository $messageRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
        if ($this->getUser() === $chat->getCreateur() || $this->getUser() === $chat->getParticipant()) {

            $page = $request->get('page', 1);
            $limite = $request->get('limite', 10);

            $jsonMessage = $serializer->serialize($messageRepository->findAllMessageByChatId($chat->getId(), $page, $limite), 'json', ['groups' => 'getMessage']);
            return new JsonResponse($jsonMessage, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse('Vous n\'avez pas accès à cette chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        }
    }
}
