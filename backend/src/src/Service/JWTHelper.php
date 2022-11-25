<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Firebase\JWT\JWT;

class JWTHelper
{
private string $appSecret;

    public function __construct()
    {
        $this->appSecret = "ighfùsjghfmkdsjhlgfnhkmgfsm,gfhghgfdh";
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
}