import { ReactElement, forwardRef } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
	isOpen: boolean;
	onToggle: (isOpen: boolean) => void;
};

export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	function ArrowButton(props, ref): ReactElement {
		const handleClick = () => {
			const newIsOpen = !props.isOpen;
			props.onToggle(newIsOpen);
		};
		return (
			<div
				ref={ref}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				onClick={handleClick}
				className={`${styles.container} ${
					props.isOpen ? styles.container_open : ''
				}`}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={`${styles.arrow} ${props.isOpen ? styles.arrow_open : ''}`}
				/>
			</div>
		);
	}
);
