<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MessageController extends AbstractController
{
    #[Route('/message', name: 'app_message')]
    public function index(): Response
    {
        return new JsonResponse('rien pour le moment', Response::HTTP_NO_CONTENT, [], true);
    }

    #[Route('/api/ping/{user}', name: 'ping_user', methods: 'POST')]
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
}
