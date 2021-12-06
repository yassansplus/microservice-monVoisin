<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class JWTSubscriber implements EventSubscriberInterface
{
    public function onLexikJwtAuthenticationOnJwtCreated(JWTCreatedEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();
        if ($user instanceof User) {
            $data["email"] = $user->getEmail();
            $data["prenom"] = $user->getPrenom();
            $data["username"] = $user->getEmail();
            $data["id"] = $user->getEmail();

            $data["nom"] = $user->getNom();
            $data["BIC"] = $user->getBIC();
            $data["IBAN"] = $user->getIBAN();

            $event->setData($data);
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_jwt_created' => 'onLexikJwtAuthenticationOnJwtCreated',
        ];
    }
}
