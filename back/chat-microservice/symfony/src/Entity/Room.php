<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=RoomRepository::class)
 */
#[ApiResource(
    denormalizationContext: [
        'groups' => ['write'],
    ],
    normalizationContext: [
        'groups' => ['read:annonce']
    ],

), ApiFilter(SearchFilter::class, properties: ['annonceTitle','firstParticipant','secondParticipant'])]
class Room
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(["read:annonce", "write"])]
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(["read:annonce", "write"])]
    private $annonceTitle;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(["read:annonce", "write"])]
    private $firstParticipant;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(["read:annonce", "write"])]
    private $secondParticipant;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="room", orphanRemoval=true,  cascade={"persist"})
     */
    #[Groups(["read:annonce", "write"])]
    private $messages;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnnonceTitle(): ?int
    {
        return $this->annonceTitle;
    }

    public function setAnnonceTitle(int $annonceTitle): self
    {
        $this->annonceTitle = $annonceTitle;

        return $this;
    }

    public function getFirstParticipant(): ?int
    {
        return $this->firstParticipant;
    }

    public function setFirstParticipant(int $firstParticipant): self
    {
        $this->firstParticipant = $firstParticipant;

        return $this;
    }

    public function getSecondParticipant(): ?int
    {
        return $this->secondParticipant;
    }

    public function setSecondParticipant(int $secondParticipant): self
    {
        $this->secondParticipant = $secondParticipant;

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setRoom($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getRoom() === $this) {
                $message->setRoom(null);
            }
        }

        return $this;
    }
}
