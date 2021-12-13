<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AdresseRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AdresseRepository::class)
 */
#[ApiResource]
class Adresse
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $streetNumber;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $route;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $locality;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $administrativeAreaLevel2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $administrativeAreaLevel1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $country;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $postalCode;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $longitude;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="adresse", cascade={"persist", "remove"})
     */
    #[Groups(["read:user", "write"])]
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStreetNumber(): ?int
    {
        return $this->streetNumber;
    }

    public function setStreetNumber(?int $streetNumber): self
    {
        $this->streetNumber = $streetNumber;

        return $this;
    }

    public function getRoute(): ?string
    {
        return $this->route;
    }

    public function setRoute(?string $route): self
    {
        $this->route = $route;

        return $this;
    }

    public function getLocality(): ?string
    {
        return $this->locality;
    }

    public function setLocality(?string $locality): self
    {
        $this->locality = $locality;

        return $this;
    }

    public function getAdministrativeAreaLevel2(): ?string
    {
        return $this->administrativeAreaLevel2;
    }

    public function setAdministrativeAreaLevel2(?string $administrativeAreaLevel2): self
    {
        $this->administrativeAreaLevel2 = $administrativeAreaLevel2;

        return $this;
    }

    public function getAdministrativeAreaLevel1(): ?string
    {
        return $this->administrativeAreaLevel1;
    }

    public function setAdministrativeAreaLevel1(?string $administrativeAreaLevel1): self
    {
        $this->administrativeAreaLevel1 = $administrativeAreaLevel1;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setAdresse(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getAdresse() !== $this) {
            $user->setAdresse($this);
        }

        $this->user = $user;

        return $this;
    }
}
