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
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/api/chat')]
class ChatController extends AbstractController
{
    public function __construct(ChatRepository $chatRepository, Security $security)
    {
        $this->chatRepository = $chatRepository;
        $this->security = $security;
    }

    #[Route('/', name: 'all_room')]
    public function index(): JsonResponse
    {
        return new JsonResponse(['allRooms' => $this->chatRepository->findAll()]);
    }

    #[Route('/creation', name: 'create_room', methods: ["GET", "POST"])]
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
}
