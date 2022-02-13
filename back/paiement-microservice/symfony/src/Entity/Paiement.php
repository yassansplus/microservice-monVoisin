<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PaiementRepository::class)
 */

#[ApiResource, ApiFilter(SearchFilter::class, properties: ['paiementId', 'userReceiverId', 'userPayer'])]
class Paiement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $paiementId;

    /**
     * @ORM\Column(type="json")
     */
    private $room = [];

    /**
     * @ORM\Column(type="integer")
     */
    private $roomId;

    /**
     * @ORM\Column(type="integer")
     */
    private $userReceiverId;

    /**
     * @ORM\Column(type="integer")
     */
    private $userPayer;

    /**
     * @ORM\Column(type="datetime")
     */
    private $payeAt;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaiementId(): ?string
    {
        return $this->paiementId;
    }

    public function setPaiementId(string $paiementId): self
    {
        $this->paiementId = $paiementId;

        return $this;
    }

    public function getRoom(): ?array
    {
        return $this->room;
    }

    public function setRoom(array $room): self
    {
        $this->room = $room;

        return $this;
    }

    public function getRoomId(): ?int
    {
        return $this->roomId;
    }

    public function setRoomId(int $roomId): self
    {
        $this->roomId = $roomId;

        return $this;
    }

    public function getUserReceiverId(): ?int
    {
        return $this->userReceiverId;
    }

    public function setUserReceiverId(int $userReceiverId): self
    {
        $this->userReceiverId = $userReceiverId;

        return $this;
    }

    public function getUserPayer(): ?int
    {
        return $this->userPayer;
    }

    public function setUserPayer(int $userPayer): self
    {
        $this->userPayer = $userPayer;

        return $this;
    }

    public function getPayeAt(): ?\DateTimeInterface
    {
        return $this->payeAt;
    }

    public function setPayeAt(?\DateTimeInterface $payeAt): self
    {
        $this->payeAt = $payeAt;

        return $this;
    }

}
