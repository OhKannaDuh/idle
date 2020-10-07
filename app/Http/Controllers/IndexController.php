<?php

namespace OhKannaDuh\Idle\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Inertia\Response;

final class IndexController extends Controller
{


    /**
     * @param Request $request
     * @param Redirector $redirector
     *
     * @return Response|RedirectResponse
     */
    public function index(Request $request, Redirector $redirector)
    {
        return $this->render("Index");
    }
}
