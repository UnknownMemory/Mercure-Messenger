<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Form\RoomType;
use App\Repository\ChatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use  Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

#[Route('/api/chat')]
class ChatController extends AbstractController
{
    public function __construct(ChatRepository $chatRepository, Security $security)
    {
        $this->chatRepository = $chatRepository;
        $this->security = $security;
    }

    #[Route('/', name: 'all_room')]
    #[IsGranted('ROLE_USER', message: 'Vous devez être connecter pour accéder aux tchats rooms')]
    public function index(): JsonResponse
    {
        return new JsonResponse(['allRooms' => $this->chatRepository->findAll()]);
    }

    #[Route('/creation', name: 'create_room', methods: ["GET", "POST"])]
    #[IsGranted('ROLE_USER', message: 'Vous devez être connecter pour créer une chat room')]
    public function creationRooms(): Response
    {
        if ($this->getUser()) {

            $room = new Chat();

            $room->setCreateur($this->getUser());
            $room->setLien("https://github.com/endroid/qr-code-bundle");
            $room->setNom("Room-de-" . $this->getUser()->getUsername() . "-" . rand(0, 1000));
            $this->chatRepository->save($room, true);

            return new JsonResponse('ChatRoom créer avec succès', Response::HTTP_OK, [], true);
        }
        return new JsonResponse('Vous devez être connecté pour créer une chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
    }

    #[Route('/{id}', name: 'one_room', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous devez être connecter pour accéder au tchat room')]
    public function oneRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser()->getId() === $chat->getCreateur()->getId() || $this->getUser() === $chat->getParticipant()) {
            return new JsonResponse(['room' => $chat->getMessages()]);
        } else {
            return new JsonResponse('Vous n\'avez pas accès à cette chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        }
    }

    #[Route('/{id}/join', name: 'join_room', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous devez être connecter pour rejoindre un tchat room')]
    public function joinRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser()->getId() === $chat->getCreateur()->getId()) {
            return new JsonResponse('Vous ne pouvez pas rejoindre votre propre chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        } else {
            $chat->setParticipant($this->getUser());
            $this->chatRepository->save($chat, true);
            return new JsonResponse('Vous avez rejoint la chatRoom avec succès', Response::HTTP_OK, [], true);
        }
    }

    #[Route('/{id}/leave', name: 'leave_room', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous devez être connecter pour quitter un tchat room')]
    public function leaveRoom(Chat $chat): JsonResponse
    {
        if ($this->getUser()->getId() === $chat->getCreateur()->getId()) {
            return new JsonResponse('Vous ne pouvez pas quitter votre propre chatRoom', Response::HTTP_UNAUTHORIZED, [], true);
        } else {
            $chat->setParticipant(null);
            $this->chatRepository->save($chat, true);
            return new JsonResponse('Vous avez quitté la chatRoom avec succès', Response::HTTP_OK, [], true);
        }
    }
}
