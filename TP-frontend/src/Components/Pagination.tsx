import React from "react";

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  limit,
  total,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 bg-dark text-white p-3 rounded shadow">
      <button
        className="btn btn-secondary"
        onClick={onPrevious}
        disabled={offset === 0}
      >
        ← Anterior
      </button>

      <span>
        Mostrando Pokémon {offset + 1} - {Math.min(offset + limit, total)} de{" "}
        {total}
      </span>

      <button
        className="btn btn-secondary"
        onClick={onNext}
        disabled={offset + limit >= total}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;
