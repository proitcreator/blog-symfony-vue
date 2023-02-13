<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230209125336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $passwordHash = '$2y$13$FwWxAffTyiyH8r3fTmueCOY9nVY9nDPro50PzBI6D/vxJLLWhJp4u';//password 123

        $this->addSql("INSERT INTO public.user (id, username, roles, password)
            VALUES ('1'::integer, 'user1'::character varying, '[]'::json, '$passwordHash'::character varying) returning id;");

        $this->addSql("INSERT INTO public.user (id, username, roles, password)
            VALUES ('2'::integer, 'user2'::character varying, '[]'::json, '$passwordHash'::character varying) returning id;");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM public.user WHERE id IN (1, 2)");
    }
}
