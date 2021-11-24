<?php
// api/src/EventSubscriber/BookMailSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['test', EventPriorities::PRE_WRITE],
        ];
    }

    private function createUser(User $user)
    {
        return $user;
    }

    public function normalizeUser(ViewEvent $event): void
    {
        $user = $this->createUser($event->getControllerResult());
        $user->setUsername($user->getEmail());
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $event->getControllerResult()->getPassword()
        );
        $user->setPassword($hashedPassword);
    }
}
