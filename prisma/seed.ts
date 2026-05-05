import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ghazeli.com' },
    update: {},
    create: {
      email: 'admin@ghazeli.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'personal-development' },
      update: {},
      create: { name: 'Personal Development', slug: 'personal-development' },
    }),
    prisma.category.upsert({
      where: { slug: 'family-support' },
      update: {},
      create: { name: 'Family Support', slug: 'family-support' },
    }),
    prisma.category.upsert({
      where: { slug: 'coaching' },
      update: {},
      create: { name: 'Coaching', slug: 'coaching' },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create sample blog posts
  const posts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: 'unlocking-your-potential' },
      update: {},
      create: {
        title: 'Unlocking Your Potential: A Guide to Self-Discovery',
        slug: 'unlocking-your-potential',
        excerpt: 'Discover the keys to unlocking your true potential through self-awareness, mindset shifts, and actionable strategies.',
        content: `# Unlocking Your Potential\n\nEvery individual carries within themselves an extraordinary capacity for growth and achievement. The journey to unlocking your potential begins with self-awareness — understanding your strengths, recognizing your patterns, and embracing your unique qualities.\n\n## The Power of Self-Awareness\n\nSelf-awareness is the foundation of personal growth. When you understand your thoughts, emotions, and behaviors, you gain the power to change them. Start by:\n\n- **Journaling daily** — Write down your thoughts and reflections\n- **Seeking feedback** — Ask trusted friends and mentors for honest input\n- **Practicing mindfulness** — Be present in each moment\n\n## Setting Meaningful Goals\n\nGoals give direction to your potential. But not just any goals — meaningful ones that align with your values and vision.\n\n1. Define your core values\n2. Create a vision for your ideal life\n3. Break it down into actionable steps\n4. Track your progress consistently\n\n## Taking Action\n\nKnowledge without action is wasted potential. Start small, stay consistent, and watch your life transform.`,
        published: true,
        categoryId: categories[0].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'family-guidance-for-mothers' },
      update: {},
      create: {
        title: 'Family Guidance for Mothers: Build Calm at Home',
        slug: 'family-guidance-for-mothers',
        excerpt: 'Simple and practical steps to improve communication with children and create a healthier family rhythm.',
        content: `# Family Guidance for Mothers\n\nA calm home starts with a calm mother. When mothers are supported, children feel safer, more connected, and more confident.\n\n## Core Principles\n\n### Emotional Awareness\nUnderstand your own emotional state before reacting to your child.\n\n### Consistent Routines\nChildren thrive when expectations are clear and daily rhythm feels predictable.\n\n### Kind and Firm Boundaries\nSupportive boundaries help children feel secure and respected.\n\n## Practical Daily Steps\n\n1. Pause before responding in stressful moments\n2. Use simple language and eye contact\n3. Offer choices instead of commands when possible\n4. End each day with a few minutes of positive connection`,
        published: true,
        categoryId: categories[1].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'transform-your-mindset' },
      update: {},
      create: {
        title: 'Transform Your Mindset, Transform Your Life',
        slug: 'transform-your-mindset',
        excerpt: 'Learn how shifting your mindset can lead to profound changes in every area of your life.',
        content: `# Transform Your Mindset\n\nYour mindset shapes your reality. The way you think about yourself, your abilities, and your circumstances directly influences the outcomes you achieve.\n\n## Fixed vs Growth Mindset\n\nPsychologist Carol Dweck identified two fundamental mindsets:\n\n- **Fixed Mindset**: Believes abilities are static and unchangeable\n- **Growth Mindset**: Believes abilities can be developed through dedication and hard work\n\n## Practical Steps to Shift Your Mindset\n\n1. **Challenge negative self-talk** — Replace "I can't" with "I'm learning"\n2. **Embrace failure as feedback** — Every setback is a lesson\n3. **Surround yourself with growth-minded people**\n4. **Read and learn continuously**\n5. **Celebrate progress, not just results**\n\n## The Ripple Effect\n\nWhen you transform your mindset, the effects ripple outward into every area of your life — relationships, career, health, and happiness.`,
        published: true,
        categoryId: categories[0].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'building-resilience' },
      update: {},
      create: {
        title: 'Building Resilience: Thriving Through Challenges',
        slug: 'building-resilience',
        excerpt: 'Resilience is not about avoiding difficulties — it\'s about developing the strength to overcome them.',
        content: `# Building Resilience\n\nLife will test you. The question isn't whether you'll face challenges, but how you'll respond to them. Resilience is the muscle that determines your ability to bounce back and grow stronger.\n\n## The Pillars of Resilience\n\n- **Self-belief**: Trust in your ability to handle adversity\n- **Adaptability**: Flexibility in the face of change\n- **Support systems**: Nurturing meaningful relationships\n- **Purpose**: Having a reason bigger than your struggles\n\n## Daily Resilience Practices\n\n1. Practice gratitude every morning\n2. Exercise regularly to build mental toughness\n3. Set boundaries to protect your energy\n4. Reflect on past challenges you've overcome\n\nRemember: diamonds are formed under pressure.`,
        published: true,
        categoryId: categories[2].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'effective-communication' },
      update: {},
      create: {
        title: 'Mastering the Art of Effective Communication',
        slug: 'effective-communication',
        excerpt: 'Communication is the bridge between confusion and clarity. Learn to master this essential skill.',
        content: `# Mastering Effective Communication\n\nGreat communication helps mothers and children feel understood. It builds trust, safety, and cooperation at home.\n\n## Key Communication Skills\n\n### Active Listening\nListen to understand feelings before giving advice.\n\n### Clarity and Kindness\nUse short and clear sentences, especially in stressful moments.\n\n### Nonverbal Communication\nYour tone, facial expression, and body language shape how children receive your message.\n\n## Family Communication\nConsistent communication creates emotional security and healthier behavior over time.`,
        published: true,
        categoryId: categories[1].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'power-of-coaching' },
      update: {},
      create: {
        title: 'The Power of Coaching: Accelerate Your Growth',
        slug: 'power-of-coaching',
        excerpt: 'Discover how professional coaching can fast-track your personal and professional development.',
        content: `# The Power of Coaching\n\nCoaching is one of the most effective ways to accelerate personal and professional growth. A skilled coach helps you see blind spots, challenge limiting beliefs, and create actionable plans.\n\n## What Makes Coaching Different\n\nUnlike therapy or mentoring, coaching:\n- Focuses on the present and future, not the past\n- Empowers you to find your own answers\n- Creates accountability structures\n- Is goal-oriented and results-driven\n\n## Benefits of Working with a Coach\n\n1. **Clarity** — Get clear on what you truly want\n2. **Accountability** — Stay committed to your goals\n3. **Perspective** — Gain new insights and viewpoints\n4. **Confidence** — Build self-assurance through action\n5. **Results** — Achieve measurable outcomes faster\n\n## Is Coaching Right for You?\n\nIf you're ready to invest in yourself and committed to growth, coaching can be transformative.`,
        published: true,
        categoryId: categories[2].id,
      },
    }),
  ]);
  console.log('✅ Blog posts created:', posts.length);

  // Create sample reservations
  await prisma.reservation.createMany({
    data: [
      {
        name: 'Ahmed Ben Ali',
        email: 'ahmed@example.com',
        phone: '+213 555 0101',
        date: '2026-04-20',
        time: '10:00',
        service: 'Personal Coaching Session',
        status: 'PENDING',
        note: 'Looking for career guidance',
      },
      {
        name: 'Fatima Zahra',
        email: 'fatima@example.com',
        phone: '+213 555 0202',
        date: '2026-04-22',
        time: '14:00',
        service: 'Leadership Workshop',
        status: 'APPROVED',
      },
    ],
  });
  console.log('✅ Sample reservations created');

  // Create sample messages
  await prisma.message.createMany({
    data: [
      {
        name: 'Karim Hadj',
        email: 'karim@example.com',
        subject: 'Inquiry about coaching programs',
        body: 'Hello, I would like to learn more about your coaching programs. Could you provide more details about pricing and availability?',
      },
      {
        name: 'Sara Boumediene',
        email: 'sara@example.com',
        subject: 'Workshop for our company',
        body: 'We are interested in organizing a leadership workshop for our team of 20 people. Please let us know the available dates.',
        read: true,
      },
    ],
  });
  console.log('✅ Sample messages created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
