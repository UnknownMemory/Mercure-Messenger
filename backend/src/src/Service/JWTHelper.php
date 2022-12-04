<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Cookie;

class JWTHelper
{
    private string $appSecret;

    public function __construct()
    {
        $this->appSecret = "Ae5I//FZ79GhkoRFRKio78*vrvELVc34v79Za";
    }

    public function buildJWT(UserInterface $user): string
    {
        $payload = [
            "mercure" => [
                "publish" => ["*"],
                "subscribe" => ["http://localhost:1234/user/{$user->getId()}/{?topic}"],
                "payload" => [
                    "username" => $user->getUsername(),
                    "userId" => $user->getId()
                ]
            ]
        ];


        return JWT::encode($payload, $this->appSecret, 'HS256');
    }

    public function buildMercureCookie(User $user): string
    {
        $jwt = $this->buildJWT($user);

        return Cookie::create(
            'mercureAuthorization',
            $jwt,
            new \DateTime("120 hours"),
            '/',
            'localhost',
            true,
            true,
            false,
            Cookie::SAMESITE_NONE
        );
    }
}
