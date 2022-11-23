<?php

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
/* 
#[Route('/api/chat')]
class ChatController extends AbstractController
{
    public function __construct(ChatRepository $chatRepository, Security $security)
    {
        $this->chatRepository = $chatRepository;
        $this->security = $security;
    }

    #[Route('/', name: 'app_all')]
    public function index(): JsonResponse
    {
        return new JsonResponse(['allRooms' => $this->chatRepository->findAll()]);
    }

    #[Route('/creation', name: 'app_creation', methods: ["GET", "POST"])]
    public function creationRooms(Request $request): Response
    {
        $room = new Chat();
        $form  = $this->createForm(RoomType::class, $room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->chatRepository->save($room, true);
        }

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonContent = $serializer->serialize($room, 'json');
        return new JsonResponse($jsonContent);
    }
}
 */