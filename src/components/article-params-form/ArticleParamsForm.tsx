import { ReactElement, useState, useRef } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';

import { Button } from 'components/button';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';

type ParamConfig = {
	type: 'select' | 'radio';
	key: keyof ArticleStateType;
	options: OptionType[];
	title: string;
};

const paramConfigs: ParamConfig[] = [
	{
		type: 'select',
		key: 'fontFamilyOption',
		options: fontFamilyOptions,
		title: 'шрифт',
	},
	{
		type: 'radio',
		key: 'fontSizeOption',
		options: fontSizeOptions,
		title: 'размер шрифта',
	},
	{
		type: 'select',
		key: 'fontColor',
		options: fontColors,
		title: 'цвет шрифта',
	},
	{
		type: 'select',
		key: 'backgroundColor',
		options: backgroundColors,
		title: 'цвет фона',
	},
	{
		type: 'select',
		key: 'contentWidth',
		options: contentWidthArr,
		title: 'ширина контента',
	},
];

type ArticleParamsFormProps = {
	isOpen: boolean;
	onParamsChange: (newParams: ArticleStateType) => void;
	setIsOpen: (isOpen: boolean) => void;
};

export const ArticleParamsForm = (
	props: ArticleParamsFormProps
): ReactElement => {
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClick({ ref: formRef, callback: () => props.setIsOpen(false) });

	const handleParamChange =
		(key: keyof ArticleStateType) => (selected: OptionType) => {
			setParams((prevParams) => ({ ...prevParams, [key]: selected }));
		};

	const handleReset = () => {
		setParams(defaultArticleState);
		props.onParamsChange(defaultArticleState);
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		props.onParamsChange(params);
	};

	return (
		<>
			<aside
				ref={formRef}
				className={`${styles.container} ${
					props.isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'задайте параметры'}
					</Text>
					<Separator isThick={true} />
					{paramConfigs.map(({ type, key, options, title }) => (
						<div key={key}>
							{type === 'select' ? (
								<Select
									selected={params[key]}
									options={options}
									onChange={handleParamChange(key)}
									title={title}
								/>
							) : (
								<RadioGroup
									name={key}
									selected={params[key]}
									options={options}
									onChange={handleParamChange(key)}
									title={title}
								/>
							)}
							<Separator isThick={true} />
						</div>
					))}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
