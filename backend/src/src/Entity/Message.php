<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /*   #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(["getMessage"])]
    private ?\DateTimeInterface $datePubli = null; */

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["getMessage"])]
    private ?\DateTimeInterface $datePubli = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["getMessage"])]
    private ?string $contenu = null;


    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chat $chatId = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getMessage"])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatePubli(): ?\DateTimeInterface
    {
        return $this->datePubli;
    }

    public function setDatePubli(\DateTimeInterface $datePubli): self
    {
        $this->datePubli = $datePubli;

        return $this;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): self
    {
        $this->contenu = $contenu;

        return $this;
    }


    public function getChatId(): ?Chat
    {
        return $this->chatId;
    }

    public function setChatId(?Chat $chatId): self
    {
        $this->chatId = $chatId;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
