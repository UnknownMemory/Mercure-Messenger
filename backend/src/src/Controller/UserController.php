<?php

namespace App\Controller;

use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends AbstractController
{
    #[Route('api/users', name: 'users-list', methods: 'GET')]
    public function getUsersList(UserRepository $userRepository)
    {
        $user = $this->getUser();

        return $this->json(['users' => $userRepository->findAllExcept($user->getId())], Response::HTTP_OK, [], ['groups' => 'getChat']);
    }

    #[Route('api/user/info', name: 'user_info', methods: 'GET')]
    public function login_check(SerializerInterface $serializer)
    {
        $user = $this->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'infoUser']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    // #[Route('api/test', name: 'show-users', methods: 'GET')]
    //public function getAllUsers(UserRepository $userRepository, SerializerInterface $serializer, Request $request): JsonResponse {
    //  $page = $request->get('page', 1);
    //  $limite = $request->get('limite', 3);
    // $userList = $userRepository->findAllWithPagination($page, $limite);

    //$jsonUserList = $serializer->serialize($userList,'json',['groups' => 'getChat']);
    // return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    // }
}
