import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Builds a compact page list: 1, 2 … 7, 8 (current ± 1, plus first/last, with ellipses)
function buildPageList(current, last) {
    const delta = 1;
    const range = [];
    const withDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
            range.push(i);
        }
    }

    range.forEach((i) => {
        if (l) {
            if (i - l === 2) {
                withDots.push(l + 1);
            } else if (i - l > 2) {
                withDots.push('...');
            }
        }
        withDots.push(i);
        l = i;
    });

    return withDots;
}

/**
 * Reusable pagination bar for Laravel paginator meta.
 *
 * Props:
 * - currentPage: number  → users.current_page from the Laravel paginator
 * - lastPage: number     → users.last_page from the Laravel paginator
 * - onPageChange: (page: number) => void
 */
export default function Paginate({ currentPage, lastPage, onPageChange }) {
    if (lastPage <= 1) return null;

    const pages = buildPageList(currentPage, lastPage);

    const baseBtn =
        'min-w-[2.25rem] h-9 px-2 inline-flex items-center justify-center rounded-lg text-sm font-medium transition';
    const inactiveBtn = `${baseBtn} text-gray-600 hover:bg-gray-100`;
    const activeBtn = `${baseBtn} bg-violet-500 text-white`;
    const navBtn =
        'h-9 px-3 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed';

    return (
        <nav className="flex items-center justify-between gap-2 pt-2" aria-label="Pagination">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={navBtn}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Précédent</span>
            </button>

            {/* Page numbers on larger screens */}
            <div className="hidden sm:flex items-center gap-1">
                {pages.map((p, idx) =>
                    p === '...' ? (
                        <span key={`dots-${idx}`} className="px-1 text-gray-400 select-none">
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onPageChange(p)}
                            className={p === currentPage ? activeBtn : inactiveBtn}
                            aria-current={p === currentPage ? 'page' : undefined}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            {/* Compact "Page X / Y" on small screens instead of a full number row */}
            <div className="flex sm:hidden text-sm text-gray-600">
                Page {currentPage} / {lastPage}
            </div>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={navBtn}
            >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    );
}