<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Form\RoomType;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
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

    #[Route('/mesChats', name: 'my_room')]
    public function index(SerializerInterface $serializerInterface): JsonResponse
    {
        $chatList = $this->chatRepository->findByUserChats($this->getUser());

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
    #[Route('/creation', name: 'create_room', methods: ["GET", "POST"])]
    public function creationRooms(): Response
    {
        $room = new Chat();
        $room->setCreateur($this->getUser());
        $room->setLien("https://github.com/endroid/qr-code-bundle");
        $room->setNom("Room-de-" . $this->getUser()->getUsername() . "-" . uniqid());
        $this->chatRepository->save($room, true);

        return new JsonResponse('ChatRoom créer avec succès', Response::HTTP_OK, [], true);
    }

    /* Rejoindre une room */
    #[Route('/{id}/join', name: 'join_room', methods: ['GET'])]
    public function joinRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser() === $chat->getCreateur()) {
            return new JsonResponse('Vous ne pouvez pas rejoindre votre propre chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        } else {
            $chat->setParticipant($this->getUser());
            $this->chatRepository->save($chat, true);
            return new JsonResponse('Vous avez rejoint la chatRoom avec succès', Response::HTTP_OK, [], true);
        }
    }

    /* Quitter une room */
    #[Route('/{id}/leave', name: 'leave_room', methods: ['GET'])]
    public function leaveRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser() === $chat->getCreateur()) {
            return new JsonResponse('Vous ne pouvez pas quitter votre propre chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        } else {
            $chat->setParticipant(null);
            $this->chatRepository->save($chat, true);
            return new JsonResponse('Vous avez quitté la chatRoom avec succès', Response::HTTP_OK, [], true);
        }
    }

    /* Afficher une room */
    #[Route('/{id}', name: 'one_room', methods: ['GET'])]
    public function oneRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser() === $chat->getCreateur() || $this->getUser() === $chat->getParticipant()) {
            return new JsonResponse(['room' => $chat->getMessages()]);
        } else {
            return new JsonResponse('Vous n\'avez pas accès à cette chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        }
    }
}
