<?php

namespace App\Entity;

use App\Repository\ChatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ChatRepository::class)]
#[UniqueEntity(fields: ['nom'], message: 'Ce groupe existe déjà')]
class Chat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getChat"])]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'chatId', targetEntity: Message::class)]
    #[Groups(["getChat"])]
    private Collection $messages;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(["getChat"])]
    private ?string $nom = null;

    #[ORM\ManyToOne(inversedBy: 'chats')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getChat"])]
    private ?User $createur = null;

    #[ORM\ManyToOne(inversedBy: 'chats')]
    #[Groups(["getChat"])]
    private ?User $participant = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getChat"])]
    private ?string $lien = null;




    public function __construct()
    {
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setChatId($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getChatId() === $this) {
                $message->setChatId(null);
            }
        }

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return User|null
     */
    public function getCreateur(): ?User
    {
        return $this->createur;
    }

    /**
     * @param User|null $createur
     */
    public function setCreateur(?User $createur): void
    {
        $this->createur = $createur;
    }

    public function getParticipant(): ?User
    {
        return $this->participant;
    }

    public function setParticipant(?User $participant): self
    {
        $this->participant = $participant;

        return $this;
    }

    public function getLien(): ?string
    {
        return $this->lien;
    }

    public function setLien(string $lien): self
    {
        $this->lien = $lien;

        return $this;
    }
}
