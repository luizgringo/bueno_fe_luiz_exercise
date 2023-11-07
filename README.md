# Tempo Frontend challenge

## Solution Improvement

- Change project to use pnpm instead of npm.
- Separate Router from App.tsx.
- Remove types folder and move their respective interfaces to their contexts.
- Improvement of variable naming to be more descriptive.
- Create folders to organize the pages.
- Rename `Teams` type to `Team` because this instance refeers to a one instance of `Team`.
- Favoring the syntax `function foo() {}` over `const foo = ()=> {}`,
  leaving the syntax with `const` only in necessary cases. functions with the syntax
  of `const` creates some code organization restrictions, forcing you to declare it before the
  use.
- Destructuring `props` inside components.
- Giving descriptive names to their respective `props` components interface.
- Add `JSX.Element` to type and define components.
- Use `React.useMemo` on components that handle lists to avoid reerendering and improve performance.
- Change the definition of `var` to `const` for variables that do not require mutability.
- Create `UserCard` componenet to separate the responsibility of the `UserOverview` page and the `Card` component specific to the page context.
- Create `TeamLeadCard` componenet to separate the responsibility of the `TeamOverview` page and the `Card` component specific to the page context.
- Add Avatar on `UserCard`.
- Add Ant Design to serve as primary source of UI Component Library and improve layout and user interface and experience.
- Add Roboto to serve a primary source of font.
- Add Breadcrumb Navigation, instead o back button.
- Improve Card Layout.
- Add Card Animation.
- Add Card Image Placeholder for Teams and Users.
- Improve Layout and User Experience.
- Adds search component to teams page.

OBS: I tried to use the `avatarUrl` that comes from the `users` endPoint to display their respective avatars, but all the images that were coming were broken.
So i used `https://pravatar.cc/` to serve as a avatar placeholder.

## To Run the project you must run

### Install pnpm package manager

```terminal
npm install -g pnpm
```

### Run:

```terminal
npm install
```

### after the installation finished, you can run

```terminal
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

### To run the tests yo must run

```terminal
npm run test
```
