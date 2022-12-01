<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\JWTHelper;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Mercure\Authorization;


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
    public function login(Request $request, JWTHelper $jWTHelper, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasher, Authorization $authorization): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $userRepository->findOneBy(['username' => $data['username']]);
        if (!$user) {
            throw new \Exception('User not found');
        }

        if (!$userPasswordHasher->isPasswordValid($user, $data['password'])) {
            throw new \Exception('Invalid password');
        }

        /* Set cookie */

        return new JsonResponse([
            'JWT' =>  $token = $jWTHelper->buildJWT($user)
        ], Response::HTTP_OK, [
            /* $name, $value, $expire, $path, $domain, $secure, $httpOnly, $raw, $sameSite -> voir Cookie.php pour voir a quoi correspondent les champs */
            'Cookie' => new Cookie('Authorization', $token, time() + 3600, '/', null, false, false, false, 'strict')
        ]);
    }
}
