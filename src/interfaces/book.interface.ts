export interface BookInterface {
    id: number;
    title: string;
    author: string;
    poster: string;
    genre: string;
    year: number;
    description: string;
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
}