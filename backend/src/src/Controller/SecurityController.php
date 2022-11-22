<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register($request, UserPasswordHasherInterface $userPasswordHasher): Response
    {   
        $user = new User();

        $user->setName($request->get('name'));
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $request->get('plainPassword')->getData()
            )
        );

        return $this->render('security/index.html.twig', [
            'controller_name' => 'SecurityController',
        ]);
    }
}
