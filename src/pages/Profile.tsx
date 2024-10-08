import React from "react";
import Button from "../components/common/Button";
import { Pencil, Save } from "lucide-react";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col justify-center w-full rounded-xl border shadow-lg">
      <div className="flex flex-row justify-end items-end sm:mx-auto sm:w-full sm:max-w-lg">
        <img
          className="mx-auto h-40 w-auto"
          src="/avatar/lion-avatar.png"
          alt="Avatar"
        />
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg p-3 rounded-md">
        {isEditing ? (
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="nombre"
                autoComplete="nombre"
                required
                className="mt-2 block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 rounded-md border shadow-md px-4"
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                autoComplete="apellido"
                required
                className="mt-2 block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 rounded-md border shadow-md px-4"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 rounded-md border shadow-md px-4"
              />
            </div>

            <div className="flex items-end justify-end">
              <Button
                size={"extrasmall"}
                variant={"primary"}
                onClick={() => setIsEditing(false)}
              >
                <Save />
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2 rounded-md border shadow-md px-4">
                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                  John
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2 rounded-md border shadow-md px-4">
                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                  Doe
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2 rounded-md border shadow-md px-4">
                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                  john.doe@example.com
                </p>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <Button
                size={"extrasmall"}
                variant={"primary"}
                onClick={() => setIsEditing(true)}
              >
                <Pencil />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
