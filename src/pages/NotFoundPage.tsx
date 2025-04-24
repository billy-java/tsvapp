const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Seite nicht gefunden</p>
      <p className="text-lg text-gray-500 mt-2">
        Entschuldigung, die gesuchte Seite existiert nicht.
      </p>
      <a
        href="/home"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Zurück zur Startseite
      </a>
    </div>
  );
};

export default NotFoundPage;