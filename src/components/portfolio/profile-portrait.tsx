import { existsSync } from "node:fs";
import path from "node:path";

const localPhotoCandidates = [
  {
    publicPath: "/profile/tutor-photo.jpg",
    filePath: path.join(process.cwd(), "public/profile/tutor-photo.jpg")
  },
  {
    publicPath: "/profile/tutor-photo.jpeg",
    filePath: path.join(process.cwd(), "public/profile/tutor-photo.jpeg")
  },
  {
    publicPath: "/profile/tutor-photo.png",
    filePath: path.join(process.cwd(), "public/profile/tutor-photo.png")
  },
  {
    publicPath: "/profile/tutor-photo.webp",
    filePath: path.join(process.cwd(), "public/profile/tutor-photo.webp")
  }
];

function getLocalPhotoPath() {
  const match = localPhotoCandidates.find((item) => existsSync(item.filePath));
  return match?.publicPath ?? null;
}

export function ProfilePortrait({
  name,
  profileImageUrl
}: {
  name: string;
  profileImageUrl?: string | null;
}) {
  const imageSource = profileImageUrl || getLocalPhotoPath();

  if (!imageSource) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10 text-center">
        <div>
          <p className="font-display text-4xl">{name.split(" ")[0]}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Add a profile image from the admin dashboard or place a local photo in `public/profile`.
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={`${name} portrait`}
      className="h-full w-full object-cover"
    />
  );
}
