<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('api/users', name: 'users-list', methods: 'GET')]
    public function getUsersList(UserRepository $userRepository){
        $user = $this->getUser();

        return $this->json(['users' => $userRepository->findAllExcept($user->getId())], Response::HTTP_OK, [], ['groups' => 'getChat']);
    }
}