<?php

namespace App\Controller;

use App\Entity\User;
use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($userPasswordHasher->hashPassword($user, $user->getPassword()));
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('Utilisateur enregistré avec succès', Response::HTTP_OK, [], true);
    }

    #[Route('/api/login', name: 'user_login', methods: ['POST', 'GET'])]
    public function login(string $appSecret, User $user): JsonResponse
    {

        if (null === $user) {
            return $this->json(
                [
                    'message' => 'missing crendentials',
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $jwt = JWT::encode(
            [
                'username' => $user->getUsername(),
                'id' => $user->getId()
            ],
            $appSecret,
            'HS256'
        );

        return new JsonResponse(['jwt' => $jwt]);
    }
}
