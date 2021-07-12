|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release|

frontend-app-profile
====================

This is a micro-frontend application responsible for the display and updating of user profiles. Please tag **@edx/arch-fed** on any PRs or issues.

When a user views their own profile, they're given fields to edit their full name, location, primary spoken language, education, social links, and bio.  Each field also has a dropdown to select the visibility of that field - i.e., whether it can be viewed by other learners.

When a user views someone else's profile, they see all those fields that that user set as public.

----------

Development
-----------

Start Devstack
^^^^^^^^^^^^^^

To use this application `devstack <https://github.com/edx/devstack>`__ must be running and you must be logged into it.

-  Start devstack
-  Log in (http://localhost:18000/login)

Start the development server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this project, install requirements and start the development server by running:

.. code:: bash

   npm install
   npm start # The server will run on port 1995

Once the dev server is up visit http://localhost:1995/u/staff.

----------

Configuration and Deployment
----------------------------

This MFE is configured via node environment variables supplied at build time. See the .env file for the list of required environment variables. Example build syntax with a single environment variable:

.. code:: bash

   NODE_ENV=production ACCESS_TOKEN_COOKIE_NAME='edx-jwt-cookie-header-payload' npm run build


For more information see the document: `Micro-frontend applications in Open
edX <https://edx.readthedocs.io/projects/edx-developer-docs/en/latest/micro-frontends-in-open-edx.html>`__.

----------

Notes
-----

The production Webpack configuration for this repo uses `Purgecss <https://www.purgecss.com/>`__ to remove unused CSS from the production css file. In ``webpack.prod.config.js`` the Purgecss plugin is configured to scan directories to determine what css selectors should remain. Currently the src/ directory is scanned along with all ``@edx/frontend-component*`` node modules and ``@edx/paragon``. **If you add and use a component in this repo that relies on HTML classes or ids for styling you must add it to the Purgecss configuration or it will be unstyled in the production build.**

.. |Build Status| image:: https://api.travis-ci.com/edx/frontend-app-profile.svg?branch=master
   :target: https://travis-ci.com/edx/frontend-app-profile
.. |Codecov| image:: https://img.shields.io/codecov/c/github/edx/frontend-app-profile
   :target: https://codecov.io/gh/edx/frontend-app-profile
.. |npm_version| image:: https://img.shields.io/npm/v/@edx/frontend-app-profile.svg
   :target: https://www.npmjs.com/package/@edx/frontend-app-profile
.. |npm_downloads| image:: https://img.shields.io/npm/dt/@edx/frontend-app-profile.svg
   :target: https://www.npmjs.com/package/@edx/frontend-app-profile
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-app-profile.svg
   :target: @edx/frontend-app-profile
.. |semantic-release| image:: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
   :target: https://github.com/semantic-release/semantic-release
