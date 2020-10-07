<?php

namespace OhKannaDuh\Idle\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Inertia\Response;
use Inertia\ResponseFactory;

abstract class Controller extends \Illuminate\Routing\Controller
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;

    /** @var ResponseFactory */
    private $responseFactory;


    /**
     * @param ResponseFactory $responseFactory
     */
    public function __construct(ResponseFactory $responseFactory)
    {
        $this->responseFactory = $responseFactory;
    }


    /**
     * Initialise the controller.
     *
     * @return void
     */
    protected function initialise(): void
    {
    }


    /**
     * @param string $component
     * @param array $properties
     *
     * @return Response
     */
    protected function render(string $component, array $properties = []): Response
    {
        return $this->responseFactory->render($component, $properties);
    }
}
