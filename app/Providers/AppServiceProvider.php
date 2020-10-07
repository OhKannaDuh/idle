<?php

namespace OhKannaDuh\Idle\Providers;

use Illuminate\Config\Repository;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Session\Store;
use Illuminate\Support\ServiceProvider;
use Inertia\ResponseFactory;
use OhKannaDuh\Idle\Models\Auth\User;

use function md5_file;
use function public_path;

final class AppServiceProvider extends ServiceProvider
{


    public function boot(ResponseFactory $responseFactory, Repository $config, Store $session, Guard $auth): void
    {
        $responseFactory->version(function () {
            return md5_file(public_path("mix-manifest.json"));
        });

        $responseFactory->share([
            "app" => [
                "name" => $config->get("app.name"),
            ],
            "auth" => function () use ($auth) {
                /** @var User|null $user */
                $user = $auth->user();
                if (!$user) {
                    return ["user" => null];
                }

                return [
                    "user" => [
                        "username" => $user->getUsername(),
                        "api_token" => $user->getApiToken(),
                    ],
                ];
            },
            "errors" => function () use ($session) {
                $errors = $session->get("errors");
                if (!$errors) {
                    return (object) [];
                }

                return $session->get("errors")->getBag("default")->getMessages();
            },
        ]);
    }
}
