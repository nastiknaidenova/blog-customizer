import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	return <ArrowButton isOpen={isOpen} onToggle={setIsOpen} />;
};

export const ArrowButtonStory: Story = {
	render: () => <ArrowButtonComponent />,
};
