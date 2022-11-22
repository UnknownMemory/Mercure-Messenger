<?php

use App\Entity\Chat;
use App\Form\RoomType;
use App\Repository\ChatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{

    public function __construct(ChatRepository $chatRepository) {
        $this->chatRepository = $chatRepository;
    }

    #[Route('/', name: 'app_all')]
    public function index(): Response {
       return $this->render('rooms/index.json', [
           'allRooms' => $this->chatRepository->findAll(),
       ]);
    }

    #[Route('/creation', name: 'app_creation', methods: ["GET", "POST"])]
    public function creationRooms(Request $request) : Response {
        $room = new Chat();
        $form  = $this->createForm(RoomType::class, $room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $room->setCreateur($this->getUser()->getId());
        }
    }

}