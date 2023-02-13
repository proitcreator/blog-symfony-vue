<?php

namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CreatePost extends AbstractController
{
    public function __invoke(Post $post): Post
    {
        $user = $this->getUser();

        if (!empty($user)) {
            $post->setOwner($user);
        }

        return $post;
    }
}
