import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article';
import { ArrowButton } from 'components/arrow-button';
import { ArticleParamsForm } from './components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticleState);
	const buttonRef = useRef<HTMLDivElement>(null);

	const toggleOpenState = (newIsOpen: boolean) => {
		setIsOpen(newIsOpen);
	};

	const handleParamsChange = (newParams: ArticleStateType) => {
		setArticleParams(newParams);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton ref={buttonRef} isOpen={isOpen} onToggle={toggleOpenState} />
			<ArticleParamsForm
				ref={buttonRef}
				isOpen={isOpen}
				onParamsChange={handleParamsChange}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
