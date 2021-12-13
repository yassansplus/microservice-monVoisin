<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity({"email"}, errorPath="email", message="Oh... mais il semblerait que vous soyez deja inscris 🔥")
 * @ApiResource()
 */
#[ApiResource(
    denormalizationContext: [
        'groups' => ['write'],
    ],
    normalizationContext: [
        'groups' => ['read:user']
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface, JWTUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(
     *     message = "l' '{{ value }}' semble ne pas être une e-mail valide."
     * )
     */
    #[Groups(["read:user", "write"])]
    private $email;

    /**
     * @ORM\Column(type="json"))
     */
    #[Groups(["read:user", "write"])]
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    #[Groups(["write"])]
    private $password;

    /**
     * @ORM\Column(type="string", length=70)
     * @Assert\Length(
     *      min=2,
     *      max = 70,
     *      minMessage = "Attention ⚠️: il semblerait que votre prénom soit trop court",
     *      maxMessage = "Attention ⚠️: il semblerait que votre nom soit trop long"
     * )
     */
    #[Groups(["read:user", "write"])]
    private $nom;

    /**
     * @ORM\Column(type="string", length=70)
     * @Assert\Length(
     *      min=2,
     *      max = 70,
     *      minMessage = "Attention ⚠️: il semblerait que votre prénom soit trop court",
     *      maxMessage = "Attention ⚠️: il semblerait que votre nom soit trop long"
     * )
     */
    #[Groups(["read:user", "write"])]
    private $prenom;

    /**
     * @ORM\Column(type="blob", nullable=true)
     */
    #[Groups(["read:user", "write"])]
    private $photo;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Assert\Iban(
     *     message="Oups 😥 il semblerait que votre IBAN comporte une erreur."
     * )
     */
    #[Groups(["read:user", "write"])]
    private $IBAN;

    /**
     * @Assert\Bic(
     *     message="Oups 😥 il semblerait que votre BIC comporte une erreur"
     * )
     */
    #[Groups(["read:user", "write"])]
    private $BIC;


    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["read:user", "write"])]
    private $username;

    /**
     * @ORM\OneToOne(targetEntity=Adresse::class, inversedBy="user", cascade={"persist", "remove"})
     */
    #[Groups(["read:user", "write"])]
    private $adresse;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getIBAN(): ?string
    {
        return $this->IBAN;
    }

    public function setIBAN(?string $IBAN): self
    {
        $this->IBAN = $IBAN;

        return $this;
    }

    public function getBIC(): ?string
    {
        return $this->BIC;
    }

    public function setBIC(?string $BIC): self
    {
        $this->BIC = $BIC;

        return $this;
    }


    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public static function createFromPayload($username, array $payload)
    {
        $user = new User();

        return $user;
    }

    public function getAdresse(): ?Adresse
    {
        return $this->adresse;
    }

    public function setAdresse(?Adresse $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }
}
