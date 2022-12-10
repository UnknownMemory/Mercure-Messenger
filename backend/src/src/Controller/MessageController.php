<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\User;
use App\Entity\Message;
use App\Repository\MessageRepository;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/chat')]
class MessageController extends AbstractController
{

    #[Route('/message', name: 'app_message')]
    public function index(): Response
    {
        return new JsonResponse('rien pour le moment', Response::HTTP_NO_CONTENT, [], true);
    }

    #[Route('/ping/{user}', name: 'ping_user', methods: 'POST')]
    public function pingUser(User $user, HubInterface $hub)
    {
        $update = new Update(
            [
                "http://example.com/ping",
                "http://localhost:1234/user/{$user->getId()}/?topic=" . urlencode("http://example.com/ping")
            ],
            json_encode(['message' => $user->getUsername(), 'id' => $user->getId()]),
            true,
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent'
        ]);
    }

    #[Route('/{chat}/message', name: 'app_message_test', methods: ['POST'])]
    public function indexTest(Chat $chat, HubInterface $hub, MessageRepository $messagerepository, Request $request): Response
    {

        if ($this->getUser() === $chat->getCreateur() || $this->getUser() === $chat->getParticipant()) {
            $getMessage = json_decode($request->getContent(), true);
            $message = new Message();
            $message->setChatId($chat);
            $message->setContenu($getMessage['messages']);
            $message->setDatePubli(new \DateTime('now'));
            $message->setUser($this->getUser());
            $messagerepository->save($message, true);


            /* si l'user connecter = au créateur de la room  */
            if ($this->getUser() === $chat->getCreateur()) {
                /* On dit que $user est = au participant */
                $user = $chat->getParticipant();
            } else {
                $user = $chat->getCreateur();
            }

            $update = new Update(
                [
                    "/chat/{$chat->getId()}",
                    "http://localhost:1234/user/{$user->getId()}/?topic=" . urlencode("/chat/{$chat->getId()}"),

                ],
                json_encode([
                    'id' => $this->getUser()->getId(),
                    'name' => $this->getUser()->getUserName(),
                    'messages' => $getMessage['messages'],
                ]),
                true
            );
            $hub->publish($update);


            return new JsonResponse('Message envoyé avec succès', Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse('Vous n\'avez pas accès à ce chat', Response::HTTP_FORBIDDEN, [], true);
        }
    }

    #[Route('api/test', name: 'show-message', methods: 'GET')]
    public function getAllMessages(MessageRepository $messageRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
        $page = $request->get('page', 1);
        $limite = $request->get('limite', 3);
        $messageList = $messageRepository->findAllWithPagination($page, $limite);

        $jsonUserList = $serializer->serialize($messageList, 'json', ['groups' => 'getChat']);
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }
}
