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
        $this->appSecret = "Ae5I//FZ79GhkoRF";
    }

    public function buildJWT(UserInterface $user): string
    {
        $payload = [
            "mercure" => [
                "publish" => ["*"],
                "subscribe" => ["*"],
                "payload" => [
                    "username" => $user->getUserIdentifier()
                ]
            ]
        ];


        return JWT::encode($payload, $this->appSecret, 'HS256');
    }

    public function buildMercureCookie(User $user): string
    {
        $jwt = $this->buildJWT($user);

        return Cookie::create(
            'mercureAuth',
            $jwt,
            new \DateTime("120 hours"),
            '/.well-known/mercure',
            'localhost',
            true,
            true,
            false,
            Cookie::SAMESITE_STRICT
        );
    }
}
