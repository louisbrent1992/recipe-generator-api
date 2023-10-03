<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/louisbrent1992/recipe-generator-api">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Recipe Generator</h3>

  <p align="center">
    Recipe Generator API using OpenAI's Chat-gpt-3.5 API.
    <br />
    <a href="https://github.com/louisbrent1992/recipe-generator-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/louisbrent1992/recipe-generator-api">View Demo</a>
    ·
    <a href="https://github.com/louisbrent1992/recipe-generator-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/louisbrent1992/recipe-generator-api/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot-3]](https://example.com)
<br />
<br />
[![Product Name Screen Shot][product-screenshot]](https://example.com)
<br />
<br />
[![Product Name Screen Shot][product-screenshot-2]](https://example.com)
<br />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React.js][React.js]][React-url]

### Installation

1. Get a free API Key at [OpenAI](https://platform.openai.com/account/api-keys)
2. Clone the repo
```sh
git clone https://github.com/louisbrent1992/recipe-generator-api.git
```
3. Install NPM packages

```sh
cd Frontend
npm install
cd ../Backend
npm install
```

4. Create a `.env` file in the Backend folder:
```sh
touch .env
```
5. Enter your config details in the `.env` file:
```js
CHANNEL_ID="your_channel_id"
GOOGLE_CLIENT_ID="google_client_id"
HUGGINGFACE_TOKEN="hugging_face_token"
JWT_SECRET="secret"
MONGODB_URI="mongo_db_uri"
OPENAI_API_KEY="open_ai_key"
SALAI_TOKEN="discord_salai_token"
SERVER_ID="discord_server_id"
SESSION_ID="discord_session_id"
  
```

6. Create an `.env` file in the Frontend folder:
```sh
cd ../Frontend
touch .env
```

7. Enter your config details in the `.env` file:
```js  
REACT_APP_GOOGLE_CLIENT_ID="google_client_id"
```

8. Run the app
```sh
cd ../Backend
npm run server
cd ../Frontend
npm run start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Louis Brent - [@louisbrent1992](https://twitter.com/louisbrent1992) - louisbrent1992@gmail.com

Project Link: [https://github.com/louisbrent1992/recipe-generator-api](https://github.com/louisbrent1992/recipe-generator-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/louisbrent1992/recipe-generator-api.svg?style=for-the-badge
[contributors-url]: https://github.com/louisbrent1992/recipe-generator-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/louisbrent1992/recipe-generator-api.svg?style=for-the-badge
[forks-url]: https://github.com/louisbrent1992/recipe-generator-api/network/members
[stars-shield]: https://img.shields.io/github/stars/louisbrent1992/recipe-generator-api.svg?style=for-the-badge
[stars-url]: https://github.com/louisbrent1992/recipe-generator-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/louisbrent1992/recipe-generator-api.svg?style=for-the-badge
[issues-url]: https://github.com/louisbrent1992/recipe-generator-api/issues
[license-shield]: https://img.shields.io/github/license/louisbrent1992/recipe-generator-api.svg?style=for-the-badge
[license-url]: https://github.com/louisbrent1992/recipe-generator-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/louis-brent
[product-screenshot]: images/screenshot.png
[product-screenshot-2]: images/screenshot-2.png
[product-screenshot-3]: images/screenshot-3.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-Native-url]: https://reactnative.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
