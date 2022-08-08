![create-chakra example](https://user-images.githubusercontent.com/70624701/183402788-df6573dd-1657-4a06-9481-945b7fb928ed.png)

## Create Chakra Project (create-chakra)
⚒ Tool to scaffold chakra apps, without wasting time. It uses existing tools like `create-next-app` and `create-vite` and then configures chakra ui in the project.

## Usage
### npx
```
npx create-chakra@latest

# OR

npx create-chakra@latest <project-name> --template <id>
```
### yarn
```
yarn create chakra

# OR

yarn create <project-name> --template <id> 
```

### Scaffolding tools

|id        | Template   | Tool            |
|:---------|:-----------|:----------------|
|nextjs    | Next.js    | create-next-app |
|react     | React      | create-vite     |

NOTE: Add the `-ts` postfix to the ID to install with TypeScript

### Currently it's in very early stage of development
I'd appreciate your ideas, reports or any contribution to the project. Support for pnpm and some other frameworks will be added soon.

### Include template id to skip input steps

```bash
npx create-chakra@latest --template <id>
# OR
yarn create chakra --template <id>
```
