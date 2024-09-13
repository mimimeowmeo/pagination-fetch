const MAX_PAGE_NUM = 8;

export interface ProjectType {
  name: string;
  id: number;
  imgUrl: string;
}

export interface Data {
  projects: ProjectType[];
  hasMore: boolean;
  totalPages: number;
  page: number;
}

export async function fetchProjects(page = 1): Promise<Data> {
  const pageSize = 10;

  let projects = [] as ProjectType[];
  if (page <= MAX_PAGE_NUM) {
    projects = Array(pageSize)
      .fill(0)
      .map((_, i) => {
        const id = page * pageSize + (i + 1);
        return {
          name: "Project " + id,
          id,
          imgUrl: "https://placehold.co/300x200",
        };
      });
  }

  await new Promise((r) => setTimeout(r, page === 2 ? 1500 : 500));
  return {
    projects,
    hasMore: page < MAX_PAGE_NUM,
    totalPages: MAX_PAGE_NUM,
    page,
  };
}
