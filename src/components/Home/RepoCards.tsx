import { useEffect, useState } from "react";
import getAllRespo from "../../utils/getOurRepositories";
import { ModalCard } from "../../utils/ModalCard";
import { RepoCardsProp } from "../..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faL, faStar } from "@fortawesome/free-solid-svg-icons";

type Author = keyof { IamPierrot: Response[]; CaSapChim: Response[]; KitoMCVN: Response[]; }

export const RepoCards = () => {
  const [repos, setRepos] = useState<RepoCardsProp[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<RepoCardsProp | null>();
  const [selectedAuthor, setSelectedAuthor] = useState<Author>("IamPierrot");
  const [toLoadMore, setToLoadMore] = useState<number>(3);
  const [displayBtn, setDisplayBtn] = useState<boolean>(true);

  useEffect(() => {
    getAllRespo().then((rs) => {
      const repositories = rs[selectedAuthor][0]
        .filter((i) => !i.fork && !i.private)
        .map((i) => ({
          id: i.id,
          author: selectedAuthor,
          avatarUrl: i.owner.avatar_url,
          repoTitle: i.name,
          desc: i.description,
          star: i.stargazers_count,
          fork: i.forks_count,
          repoUrl: i.html_url,
          language: i.language,
          create_at: i.created_at,
        }));
      setRepos(repositories);
    }).catch((error) => {
      console.error("Error fetching repositories:", error);
    });
  }, [selectedAuthor]);

  const handleShowModal = (repo: RepoCardsProp) => {
    setShowModal(!showModal);
    setSelectedRepo(repo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRepo(null);
  };

  const handleAuthorChange = (author: Author) => {
    setSelectedAuthor(author);
    setToLoadMore(3);
    setDisplayBtn(true);
  }

  const handleLoadMore = async () => {
    const remainingReposToLoad = repos.length - toLoadMore - 3;

    if (remainingReposToLoad <= 0) {
      setDisplayBtn(false);
    }
    setToLoadMore(prev => prev + 3);
  }

  const title: string = "Details of this repository";

  return (
    <div className="flex flex-col pb-10 font-default">
      <div className="relative mb-8 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-slate-50">
          Product exhibition space
        </h1>
        <p className="text-lg font-normal text-slate-300">
          This is the showcase of{" "}
          <span className="font-medium text-cyan-500">{selectedAuthor}</span> products.
        </p>
        <div className="absolute mt-2 flex items-center border border-slate-300/10 rounded-l-lg rounded-r-lg overflow-hidden">
          {
            ["IamPierrot", "CaSapChim", "KitoMCVN"].map((author) => (
              <div
                key={author}
              >
                <button
                  className={`border-r border-slate-300/10 px-4 py-2 text-slate-50 duration-300 transition-all ${
                    selectedAuthor === author ? " bg-cyan-600" : ""
                  }`}
                  onClick={() => { handleAuthorChange(author as Author); }}
                >
                  {author}
                </button>
              </div>
            ))
          }
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {repos.slice(0, toLoadMore).map((i) => (
          <div
            key={i.id}
            className="relative flex h-52 cursor-pointer flex-col justify-between rounded-xl bg-slate-800 p-4   duration-300 hover:bg-slate-700 "
            onClick={() => handleShowModal(i)}
          >
            <div className="flex items-center gap-5">
              <img
                src={i.avatarUrl}
                alt="author image"
                className="h-14 w-14 flex-none rounded-full object-cover"
              />
              <div className="">
                <h1 className=" test-base font-bold">{i.author}</h1>
                <p className="text-slate-300">{i.repoTitle}</p>
              </div>
            </div>
            <div className="mt-auto flex w-full justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <FontAwesomeIcon icon={faStar} />
                {i.star}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FontAwesomeIcon icon={faCodeFork} />
                {i.fork}
              </div>
            </div>
          </div>
        ))}
        <ModalCard
          visible={showModal}
          close={handleCloseModal}
          title={title}
          desc={selectedRepo?.desc}
          create_at={selectedRepo?.create_at}
          language={selectedRepo?.language}
        />
      </div>
      {
        displayBtn &&
        <div className="flex w-full justify-center mt-4">
            <button
            className="bg-cyan-600 px-4 py-2 rounded-lg hover:opacity-80 duration-300"
              onClick={handleLoadMore}
            >
              Load More
            </button>
        </div>
      }
    </div>
  );
};
