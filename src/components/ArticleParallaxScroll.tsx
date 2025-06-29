// app/components/ArticleParallaxScroll.tsx
'use client'; // 这个组件使用了 Hooks (useRef, useScroll)，必须是客户端组件

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils"; // 确保你项目中已安装并配置了 clsx 和 tailwind-merge
import { AdaptedArticleCard } from "./AdaptedArticleCard"; // 导入我们之前创建的卡片

// 定义组件期望接收的 props 类型
type ArticleParallaxScrollProps = {
    articles: any[]; // 接收一个文章对象数组
    className?: string;
};

export const ArticleParallaxScroll = ({
                                          articles,
                                          className,
                                      }: ArticleParallaxScrollProps) => {
    const gridRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        container: gridRef,
        offset: ["start start", "end start"],
    });

    // 动画转换逻辑保持不变
    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

    // 将文章数组而不是图片数组，分割成三部分
    const third = Math.ceil(articles.length / 3);
    const firstPart = articles.slice(0, third);
    const secondPart = articles.slice(third, 2 * third);
    const thirdPart = articles.slice(2 * third);

    return (
        <div
            className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
            ref={gridRef}
        >
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10"
            >
                {/* 第一列 */}
                <div className="grid gap-10">
                    {firstPart.map((article) => (
                        <motion.div
                            style={{ y: translateFirst }}
                            key={"grid-1-" + article.id}
                        >
                            {/* 渲染文章卡片而不是图片 */}
                            <AdaptedArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>
                {/* 第二列 */}
                <div className="grid gap-10">
                    {secondPart.map((article) => (
                        <motion.div
                            style={{ y: translateSecond }}
                            key={"grid-2-" + article.id}
                        >
                            <AdaptedArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>
                {/* 第三列 */}
                <div className="grid gap-10">
                    {thirdPart.map((article) => (
                        <motion.div
                            style={{ y: translateThird }}
                            key={"grid-3-" + article.id}
                        >
                            <AdaptedArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};