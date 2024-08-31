import styles from './index.module.scss';

export const Separator = ({ isThick = false }) => {
	const className = isThick ? styles.separator_thick : styles.separator_thin;

	return <div className={className}></div>;
};
