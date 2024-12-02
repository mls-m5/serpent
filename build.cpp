#include <iostream>
#include <filesystem>
#include <set>
#include <vector>
#include <fstream>

auto visitedFiles = std::set<std::filesystem::path>{};

void parseFile(std::filesystem::path path, std::ostream &result)
{
    std::cout << "parsing " << path << "\n";
    if (visitedFiles.find(path) != visitedFiles.end())
    {
        std::cout << "file already visited\n";
        return;
    }
    visitedFiles.insert(path);

    auto file = std::ifstream{path};
    if (!file.is_open())
    {
        std::cerr << "file " << path << " not found\n";
        std::terminate();
    }

    for (std::string line; std::getline(file, line);)
    {
        if (line.find("import") != std::string::npos)
        {
            std::cout << line << "\n";
            std::cout << "found import\n";

            auto f1 = line.find("\"");
            auto f2 = line.find("\"", f1 + 1);

            auto newPath = line.substr(f1 + 3, f2 - f1 - 3);
            std::cout << newPath << "\n";

            parseFile("out/" + newPath + ".js", result);
        }
        else if (line.starts_with("//"))
        {
            continue;
        }
        else
        {
            auto exportStr = std::string_view{"export "};
            if (auto f = line.find(exportStr); f != std::string::npos)
            {
                line.replace(line.begin() + f, line.begin() + f + exportStr.size(), "");
            }
            result << line << "\n";
        }
    }
    result << "\n";
}

int main()
{
    // std::cout << "hello" << std::endl;

    auto result = std::ofstream{"public/main.js"};

    parseFile("out/index.js", result);

    auto indexFile = std::ifstream{"src/index.html"};
    auto indexOut = std::ofstream{"public/index.html"};

    for (std::string line; std::getline(indexFile, line);)
    {
        indexOut << line << "\n";
        if (line.find("<body>") != std::string::npos)
        {
            indexOut << "<script src='main.js'></script>";
        }
    }
}