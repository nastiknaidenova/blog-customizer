import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArrowButton } from 'components/arrow-button';
import { ArticleParamsForm } from 'components/article-params-form';
import styles from './App.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const toggleOpenState = (newIsOpen: boolean) => {
		setIsOpen(newIsOpen);
	};

	const handleParamsChange = (newParams: ArticleStateType) => {
		setArticleParams(newParams);
	};

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
			<ArrowButton isOpen={isOpen} onToggle={toggleOpenState} />
			<ArticleParamsForm
				isOpen={isOpen}
				onParamsChange={handleParamsChange}
				setIsOpen={setIsOpen}
			/>
			<Article />
		</div>
	);
};
