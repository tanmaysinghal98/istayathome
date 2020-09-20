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
<p align="center">
  <a href="https://istayathome.in">
    <img src="https://istayathome.in/static/media/full_colored_logo.b98ce243.png" alt="Logo" width="200" height="80">
  </a>
  <p align="center">
    An awesome application to spread positivity.
    <br />
    <a href="https://istayathome.in">View Demo</a>
    ·
    <a href="https://github.com/tanmaysinghal98/istayathome/issues">Report Bug</a>
    ·
    <a href="https://github.com/tanmaysinghal98/istayathome/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started and Usage](#getting-started-and-usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://istayathome.in)

### Motivation

Enthusiasm is more contagious than a virus
- We need a reason for celebration, specially when we cannot go out
- Productively utilise time
- Realistic challenges
- Sharing enthusiasm
- Virtually connecting with our buddies for a purpose
  - Adding a purpose like sharing an innovative challenge
- Sharing positivity on social media
  - For example, Ice bucket challenge shared on Instagram
  
### Idea

- 📱A webapp platform to showcase a list of challenges
  - Example of challenges: See your childhood photos, Try old clothes, Create a meme, etc
- 🔝Users will complete challenges and gain points
  - Completing a challenge will earn user points
- 💯Celebratory image as a recognition once challenge is completed
- 💕Sharing options to share on Social Media and nominate friends
  - Share and earn more traction, in turn spread good vibes

### Implementation

- Front end hosted on S3 bucket
- Get challenges from DynamoDB through API gateway
- A unique user is created if existing user cookie is not found
- When image is uploaded, lambda creates another achievement image and stores in S3
- Same image is returned to UI, as a shareable content
- User can update personal information on Profile page; User information stored in DynamoDB


### Built With

* [Bootstrap](https://getbootstrap.com)
* [Serverless Framework](https://serverless.com)
* [React.js](https://reactjs.org/)



<!-- GETTING STARTED -->
## Getting Started and Usage

This repository consists of 3 sub-parts. Read their corresponding `README.md` for information on installation and usage.
- [isah-backend](https://github.com/tanmaysinghal98/istayathome/blob/master/isah-backend/README.md)
- [pil_layer](https://github.com/tanmaysinghal98/istayathome/blob/master/pil_layer/README.md)
- [isah-frontend](https://github.com/tanmaysinghal98/istayathome/tree/master/isah-frontend)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/tanmaysinghal98/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT
## Contact

Tanmay Singhal - [@tanmaysinghal98](https://twitter.com/tanmaysinghal98) - tanmaysinghal98@gmail.com

Project Link: [https://github.com/tanmaysinghal98/istayathome](https://github.com/tanmaysinghal98/istayathome)
-->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/tanmaysinghal98/istayathome.svg?style=for-the-badge
[contributors-url]: https://github.com/tanmaysinghal98/istayathome/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tanmaysinghal98/istayathome.svg?style=for-the-badge
[forks-url]: https://github.com/tanmaysinghal98/istayathome/network/members
[stars-shield]: https://img.shields.io/github/stars/tanmaysinghal98/istayathome.svg?style=for-the-badge
[stars-url]: https://github.com/tanmaysinghal98/istayathome/stargazers
[issues-shield]: https://img.shields.io/github/issues/tanmaysinghal98/istayathome.svg?style=for-the-badge
[issues-url]: https://github.com/tanmaysinghal98/istayathome/issues
[license-shield]: https://img.shields.io/github/license/tanmaysinghal98/istayathome.svg?style=for-the-badge
[license-url]: https://github.com/tanmaysinghal98/istayathome/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tanmaysinghal98
[product-screenshot]: https://github.com/tanmaysinghal98/istayathome/blob/media/Screenshot%202020-09-20%20at%201.17.22%20AM.png
