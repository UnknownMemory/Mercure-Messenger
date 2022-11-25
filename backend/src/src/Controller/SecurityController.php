<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\JWTHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

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

    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, JWTHelper $jWTHelper, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $user = $userRepository->findOneBy(['username' => $data['username']]);
        if (!$user) {
            throw new \Exception('User not found');
        }

        if (!$userPasswordHasher->isPasswordValid($user, $data['password'])) {
            throw new \Exception('Invalid password');
        }

        return new JsonResponse(['token' => $jWTHelper->buildJWT($user)]);
    }
}
