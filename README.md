# Firebase clone channels

This is the simple action, that allow you clone channels throw Firebase projects

## Inputs

- `project_id` **(required)** - The Firebase project that contains the Hosting site to which you want to clone.
- `channel_id` **(required)** - The ID of the channel that you want to clone.
- `target_project_id` **(required)** - The Firebase project that contains the Hosting site where want to clone your channel.
- `target_channel_id` **(required)** - The ID of the channel where you want to clone your channel.
- `firebase_service_account` **(required)** - This is a service account JSON key.

## How to get Firebase service account JSON key

A full setup guide [here](https://firebase.google.com/docs/hosting/github-integration).

- If you've NOT set up Hosting, run this version of the command from the root of your local directory:

```
firebase init hosting
```

- If you've ALREADY set up Hosting, then you just need to set up the GitHub Action part of Hosting. Run this version of the command from the root of your local directory:

```
firebase init hosting:github
```

## Example №1 (with preview channels)

```
name: Clone Firebase channels
on:
  push:
    branches: [ main ]
jobs:
  build_and_deploy:
    name: Clone channels
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to prod
        uses: NikitaGlukhi/firebase-clone-channels@v1
        with:
          firebase_service_account: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          project_id: example-project
          channel_id: example-preview-channel
          target_project_id: example-project
          target_channel_id: live
```

## Example №2 (with live channels)

```
name: Clone Firebase channels
on:
  push:
    branches: [ main ]
jobs:
  build_and_deploy:
    name: Clone channels
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to prod
        uses: NikitaGlukhi/firebase-clone-channels@v1
        with:
          firebase_service_account: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          project_id: example-project-id
          channel_id: live
          target_project_id: another-example-project-id
          target_channel_id: live
```
