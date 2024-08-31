import { useEffect } from 'react';

type UseOutsideClick = {
	ref: React.RefObject<HTMLElement>;
	callback: () => void;
};

export const useOutsideClick = ({ ref, callback }: UseOutsideClick) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};
