let repository = [];

export const reset = () => {
  repository = [];
  return repository;
};

export const save = (player) => {
  remove(player);
  repository.push(player);
  return repository;
};

export const remove = (player) => {
  repository = repository.filter(
    (entity) => entity.author.id !== player.author.id
  );
  return repository;
};

export const getAll = () => repository;
